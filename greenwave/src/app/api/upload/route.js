import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dkd1pzhxt",
  api_key: "172441848343252",
  api_secret: "1sUvGnMDrEwzLwSLy-0ga8zCIEk",
  secure: true,
});

export const POST = async (req) => {
  const data = await req.formData();
  const image = await data.get("image");
  const fileBuffer = await image.arrayBuffer();

  var mime = image.type;
  var encoding = "base64";
  var base64Data = Buffer.from(fileBuffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const result = await uploadToCloudinary();

    let imageUrl = result.secure_url;

    return NextResponse.json({
      message: "Imagen subida",
      url: imageUrl,
    });
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
};
