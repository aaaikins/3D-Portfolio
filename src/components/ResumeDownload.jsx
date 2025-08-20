import React, { useState } from "react";
import Button, { ExternalLinkIcon, DownloadIcon } from "./Button";

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGeneratePDF = async () => {
    setIsDownloading(true);
    
    try {
      const resumeWindow = window.open('/assets/Aikins_Acheampong_Resume.html', '_blank');
      
      if (resumeWindow) {
        setTimeout(() => {
          try {
            resumeWindow.print();
          } catch (error) {
            // Auto-print not supported, user can print manually
          }
          setIsDownloading(false);
        }, 1000);
      } else {
        setIsDownloading(false);
      }
    } catch (error) {
      console.error('Error opening resume:', error);
      setIsDownloading(false);
    }
  };

  const handleViewResume = () => {
    window.open('/assets/Aikins_Acheampong_Resume.html', '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={handleViewResume}
        variant="primary"
        size="lg"
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        }
        rightIcon={<ExternalLinkIcon />}
        ariaLabel="View resume online in new tab"
      >
        View Resume
      </Button>

      <Button
        onClick={handleGeneratePDF}
        variant="secondary"
        size="lg"
        loading={isDownloading}
        disabled={isDownloading}
        leftIcon={<DownloadIcon />}
        ariaLabel={isDownloading ? "Preparing PDF download..." : "Download resume as PDF"}
      >
        {isDownloading ? "Preparing..." : "Download PDF"}
      </Button>
    </div>
  );
};

export default ResumeDownload;
