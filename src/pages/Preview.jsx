import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import api from '../configs/api.js';

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const {data} = await api.get('/api/resumes/public/'+resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (resumeId) loadResume();
  }, [resumeId]);

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      {isLoading ? (
        <Loader className="animate-spin text-slate-500" size={40} />
      ) : (
        <>
          <p className="text-center text-5xl text-slate-400 font-medium">
            Resume not found
          </p>

          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-10 flex items-center ring-1 ring-green-400 transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Go to Home Page
          </a>
        </>
      )}
    </div>
  );
};

export default Preview;
