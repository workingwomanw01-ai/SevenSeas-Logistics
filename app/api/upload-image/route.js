import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert the image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Create FormData for Imgur
    const imgurFormData = new FormData();
    imgurFormData.append('image', base64);
    imgurFormData.append('type', 'base64');

    // Upload to Imgur
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
      },
      body: imgurFormData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ 
        success: true, 
        imageUrl: data.data.link 
      });
    } else {
      console.error('Imgur API error:', data);
      return NextResponse.json(
        { error: data.data?.error || 'Upload failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
