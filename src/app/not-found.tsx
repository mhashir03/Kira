'use client';

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
import Header from '../components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-kira-lightRed flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full">
              <FileQuestion className="h-16 w-16 text-kira-red" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
          
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link href="/" passHref>
            <Button className="bg-kira-red hover:bg-kira-darkRed">
              Return Home
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Kira. For informational purposes only.</p>
          <p className="mt-1">Not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </footer>
    </div>
  );
} 