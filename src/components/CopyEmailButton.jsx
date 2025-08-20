import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "./Button";
import { useNotifications } from "./Toast";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const notifications = useNotifications();
  const email = "aaache27@colby.edu";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      notifications.success("Email address copied to clipboard!", {
        duration: 2000
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(() => {
      notifications.error("Failed to copy email address");
    });
  };

  const CopyIcon = ({ copied }) => (
    <AnimatePresence mode="wait">
      {copied ? (
        <motion.svg
          key="copied"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="w-4 h-4 text-mint"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </motion.svg>
      ) : (
        <motion.svg
          key="copy"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </motion.svg>
      )}
    </AnimatePresence>
  );

  return (
    <Button
      onClick={copyToClipboard}
      variant={copied ? "success" : "secondary"}
      size="md"
      leftIcon={<CopyIcon copied={copied} />}
      className={`transition-all duration-300 ${copied ? 'animate-bounce-gentle' : ''}`}
      ariaLabel={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="font-medium"
          >
            Email Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Copy Email Address
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default CopyEmailButton;
