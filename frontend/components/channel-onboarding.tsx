'use client';

import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Channel } from '@/app/page';

interface ChannelOnboardingProps {
  channels: Channel[];
  joinedChannelIds: string[];
  onJoinChannel: (channelId: string) => void;
  onComplete: () => void;
}

export default function ChannelOnboarding({
  channels,
  joinedChannelIds,
  onJoinChannel,
  onComplete,
}: ChannelOnboardingProps) {
  const allJoined = channels.length > 0 && joinedChannelIds.length === channels.length;

  const handleJoinAll = () => {
    channels.forEach(channel => {
      if (!joinedChannelIds.includes(channel._id)) {
        onJoinChannel(channel._id);
      }
    });
  };

  const VergeLogoSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path d="M4 4H9L14 15L19 4H24L16.5 20.5H11.5L4 4Z" fill="currentColor" />
      <path d="M10.5 4H13.5L8.5 15H5.5L10.5 4Z" fill="currentColor" opacity="0.4" />
    </svg>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#111827] border border-[#374151] rounded-xl p-6 md:p-8 max-w-2xl w-full space-y-6"
        >
          {/* Header with Verge branding */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-white mb-2">
              <VergeLogoSVG />
              <span className="text-lg font-extrabold tracking-tight">Verge</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome to Verge</h2>
            <p className="text-gray-400">Join channels to start sharing feedback with your team</p>
          </motion.div>

          {/* Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {channels.map((channel, index) => {
              const isJoined = joinedChannelIds.includes(channel._id);

              return (
                <motion.div
                  key={channel._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  onClick={() => setActiveChannel}
                  className="group relative overflow-hidden rounded-lg border border-[#374151] bg-[#1f2937] hover:border-[#00A870] transition-all duration-200"
                >
                  <div className="relative p-4 space-y-3 flex flex-col h-full">
                    <div>
                      <h3 className="font-semibold text-white">#{channel.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{channel.description}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onJoinChannel(channel._id)}
                      disabled={isJoined}
                      className={`mt-auto w-full py-2 px-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                        isJoined
                          ? 'bg-[#00A870]/20 text-[#00A870] cursor-default'
                          : 'bg-[#00A870] hover:bg-[#00A870]/90 text-white hover:shadow-lg hover:shadow-[#00A870]/30'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <span>Joined</span>
                          <span className="text-lg">&#10003;</span>
                        </>
                      ) : (
                        <>
                          <span>Join Channel</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-[#374151]"
          >
            {/* Skip button - far left */}
            <button
              onClick={onComplete}
              className="text-gray-500 hover:text-white text-sm font-medium transition-colors"
            >
              Skip
            </button>

            <div className="flex gap-3">
              {/* Join All Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinAll}
                disabled={allJoined}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  allJoined
                    ? 'bg-[#374151] text-gray-500 cursor-not-allowed'
                    : 'bg-[#1f2937] hover:bg-[#374151] text-white border border-[#374151]'
                }`}
              >
                {allJoined ? 'All Joined' : 'Join All Channels'}
              </motion.button>

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="px-6 py-2 rounded-lg font-semibold transition-all bg-[#00A870] hover:bg-[#00A870]/90 text-white hover:shadow-lg hover:shadow-[#00A870]/30 flex items-center gap-2"
              >
                Continue to Feed
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
