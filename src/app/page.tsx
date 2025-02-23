'use client';

import { useState } from 'react';
import { default as Image } from 'next/image';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    try {
      // TODO: Integrate with Stable Diffusion API
      // For now, using a placeholder image
      const newImage = 'https://picsum.photos/400/400';
      setImages([newImage, ...images]);
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 p-4 bg-surface rounded-lg shadow-sm">
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Describe the image you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />
        <button
          className="mt-3 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50"
          onClick={handleGenerateImage}
          disabled={!prompt || isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      <div className="grid gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="bg-surface rounded-lg overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <Image
                src={imageUrl}
                alt={`Generated image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <button
                className="text-sm text-primary hover:text-blue-600 focus:outline-none"
                onClick={() => {
                  // TODO: Implement Twitter sharing
                  console.log('Share to Twitter:', imageUrl);
                }}
              >
                Share on Twitter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}