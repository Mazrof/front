"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStoryWithText() {
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("blue");
  const [backgroundMedia, setBackgroundMedia] = useState<string | null>(null); // Handles both image and video
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>("image"); // Media type
  const router = useRouter();

  const colors = ["blue", "green", "yellow", "red", "purple", "black"];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleColorChange = (clr: string) => {
    if (!backgroundMedia) setColor(clr);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("image") ? "image" : "video";
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Media = reader.result as string;
        setBackgroundMedia(base64Media);
        setMediaPreview(URL.createObjectURL(file));
        setMediaType(fileType);
        setColor(""); // Reset color when media is selected
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeselectMedia = () => {
    setBackgroundMedia(null);
    setMediaPreview(null);
    setMediaType("image");
    setColor("blue");
  };

  const handleSubmit = () => {
    const story = {
      text,
      color,
      backgroundMedia,
      mediaType, 
      createdAt: Date.now(),
    };

    const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
    const updatedStories = [...existingStories, story];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

    router.push("/stories");
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center"
      style={{
        backgroundColor: backgroundMedia ? "transparent" : color,
        backgroundImage: mediaType === "image" ? `url(${mediaPreview})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg w-full p-6 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write your story here..."
          className="w-full bg-transparent text-white text-xl text-center p-4 rounded-lg border-2 border-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />

        <div className="flex gap-4 mb-6 justify-center">
          {colors.map((clr) => (
            <button
              key={clr}
              onClick={() => handleColorChange(clr)}
              style={{ backgroundColor: clr }}
              className="w-12 h-12 rounded-full transition-all transform hover:scale-105"
            ></button>
          ))}
        </div>

        <div className="mb-6 text-center">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="text-white py-2 px-4 bg-blue-500 rounded-lg cursor-pointer transition-all hover:bg-blue-600"
          />
        </div>

        {mediaPreview && mediaType === "video" && (
          <div className="mb-6">
            <video
              src={mediaPreview}
              controls
              className="w-full rounded-lg shadow-lg"
            ></video>
          </div>
        )}

        {backgroundMedia && (
          <div className="mb-6 text-center">
            <button
              onClick={handleDeselectMedia}
              className="p-2 bg-red-500 text-white rounded-lg transition-all hover:bg-red-600"
            >
              Deselect Media
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="p-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            Submit Story
          </button>
        </div>
      </div>
    </div>
  );
}
