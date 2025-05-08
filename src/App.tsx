import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import star from '/icon-star.svg';
import illustration from '/illustration-thank-you.svg';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="min-h-full bg-black grid place-items-center px-6 font-overpass text-white">
      <AnimatePresence mode="wait">
        {!submitted && (
          <CardWrapper keyId={1} hasMounted={hasMounted}>
            <div className="w-10 h-10 grid place-content-center rounded-full bg-[#262e38] mb-6 sm:w-12">
              <img src={star} alt="" />
            </div>

            <form className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold sm:text-[calc(28rem/16)]">
                How did we do?
              </h1>
              <p className="text-sm text-gray-400">
                Please let us know how we did with your support request. All
                feedback is appreciated to help us improve offering!
              </p>
              <ul className="flex justify-between">
                {[1, 2, 3, 4, 5].map((inp) => (
                  <RatingButton
                    value={inp}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                  />
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  return selectedRating ? setSubmitted(true) : '';
                }}
                className="bg-amber-600 text-gray-950 text-sm font-bold uppercase tracking-widest w-full rounded-[99999px] py-4 mt-2 hover:bg-white"
              >
                Submit
              </button>
            </form>
          </CardWrapper>
        )}

        {submitted && (
          <CardWrapper keyId={2} hasMounted={hasMounted}>
            <div className="flex flex-col items-center gap-6">
              <div>
                <img src={illustration} alt="" />
              </div>

              <div className="bg-[#262e38] rounded-[9999px] px-5 py-3.5 text-center text-amber-600 w-fit text-[14px] sm:text-base">
                <p className="leading-[0]">
                  You selected {selectedRating} out of 5
                </p>
              </div>

              <div>
                <p className="text-[24px] font-bold mb-4 text-center sm:text-3xl">
                  Thank you!
                </p>
                <p className="text-[14px] text-gray-400 text-center sm:text-base">
                  We appretiate xpu taking the time to give a rating. If you
                  ever need more support, don't hesitate to get in touch!
                </p>
              </div>
            </div>
          </CardWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

const CardWrapper = ({
  children,
  keyId,
  hasMounted,
}: {
  children: React.ReactNode;
  keyId: number;
  hasMounted: boolean;
}) => {
  return (
    <motion.div
      key={keyId}
      initial={
        !hasMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
      }
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="w-full max-w-[26rem] rounded-[30px] bg-linear-to-b from-[#232a34] to-[#181e27] p-6 sm:p-8"
    >
      {children}
    </motion.div>
  );
};

function RatingButton({
  value,
  selectedRating,
  setSelectedRating,
}: {
  value: number;
  selectedRating: number | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const isActive = value === selectedRating;

  return (
    <li
      className={clsx(
        'focus-within:outline-2 focus-within:outline-amber-50 text-base font-bold bg-[#262e38] text-gray-400 w-[42px] aspect-square grid place-items-center rounded-full cursor-pointer hover:bg-white hover:text-gray-900 sm:w-[51px] relative',
        { 'bg-amber-600 hover:bg-amber-600! text-gray-900': isActive }
      )}
    >
      <input
        className="absolute inset-0 opacity-0 cursor-pointer"
        id={`input-${value}`}
        name={`input-${value}`}
        type="radio"
        value={value}
        checked={isActive}
        onChange={() => setSelectedRating(value)}
      />
      <label
        htmlFor={`input-${value}`}
        className="w-full h-full grid place-items-center rounded-full pointer-events-none"
      >
        {value}
      </label>
    </li>
  );
}

export default App;
