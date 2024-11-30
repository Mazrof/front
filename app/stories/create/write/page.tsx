"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStoryWithText() {
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("blue");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // List of predefined colors
  const colors = ["blue", "green", "yellow", "red", "purple", "black"];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const handleColorChange = (clr: string) => {
    // Only change the color if no image is selected
    if (!backgroundImage) {
      setColor(clr);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setBackgroundImage(base64Image); // Save base64 of uploaded image
        setImagePreview(URL.createObjectURL(file)); // Set preview as URL
        setColor(""); // Reset color when an image is selected
      };
      reader.readAsDataURL(file); // Converts image to base64
    }
  };

  // Function to deselect the photo and allow color selection again
  const handleDeselectImage = () => {
    setBackgroundImage(null);
    setImagePreview(null);
    setColor("blue"); // Default color or keep it as it was
  };

  const handleSubmit = () => {
    const story = {
      text,
      color,
      backgroundImage,
      createdAt: Date.now(), // Valid timestamp
    };

    const existingStories = JSON.parse(
      localStorage.getItem("stories") || "[]"
    );
    const updatedStories = [...existingStories, story];
    localStorage.setItem("stories", JSON.stringify(updatedStories));

    // Redirect to the stories home page after submission
    router.push("/stories");
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center"
      style={{
        backgroundColor: backgroundImage ? "transparent" : color, // Only set backgroundColor if no image
        backgroundImage: backgroundImage ? `url(${imagePreview})` : "none", // Set image background if available
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

        {/* Dynamic color buttons */}
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

        {/* File upload for image */}
        <div className="mb-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white py-2 px-4 bg-blue-500 rounded-lg cursor-pointer transition-all hover:bg-blue-600"
          />
        </div>

        {/* Button to deselect image and reset to color */}
        {backgroundImage && (
          <div className="mb-6 text-center">
            <button
              onClick={handleDeselectImage}
              className="p-2 bg-red-500 text-white rounded-lg transition-all hover:bg-red-600"
            >
              Deselect Image
            </button>
          </div>
        )}

        {/* Submit button */}
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
