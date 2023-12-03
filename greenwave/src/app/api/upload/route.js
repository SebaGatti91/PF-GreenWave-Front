import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dkd1pzhxt', 
  api_key: '172441848343252', 
  api_secret: '1sUvGnMDrEwzLwSLy-0ga8zCIEk' 
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!image) {
      return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }).end(buffer);
    });

    return NextResponse.json({
      message: "Imagen subida",
      url: response.secure_url
    });
  } catch (error) {
    console.error("Error in image upload:", error);
    return NextResponse.json("Error en la subida de la imagen", { status: 500 });
  }
}
