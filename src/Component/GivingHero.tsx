import React from 'react'

interface AccountCardProps {
  title: string
  bankName: string
  accountName: string
  accountNumber: string
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  bankName,
  accountName,
  accountNumber
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[350px] bg-white rounded-[13px] p-[15px] sm:p-5 md:p-[25px] gap-[15px] md:gap-[25px]">
      <h2 className="w-full text-center font-medium text-[15px] sm:text-[19px] md:text-[23px] lg:text-[29px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
        {title}
      </h2>
      
      <div className="flex flex-col items-center w-full">
        <p className="w-full text-center font-medium text-[10px] sm:text-[11px] md:text-[13px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          Bank name
        </p>
        <p className="w-full text-center font-medium text-[13px] sm:text-[15px] md:text-[18px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          {bankName}
        </p>
      </div>

      <div className="flex flex-col items-center w-full">
        <p className="w-full text-center font-medium text-[10px] sm:text-[11px] md:text-[13px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          Account name
        </p>
        <p className="w-full text-center font-medium text-[11px] sm:text-[13px] md:text-[15px] lg:text-[18px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          {accountName}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between p-2 sm:p-2.5 md:px-[13px] md:py-[9px] gap-2.5 sm:gap-4 md:gap-[60px] w-full bg-white border border-dashed border-[#95828E] rounded-[6px]">
        <span className="flex-1 text-center font-bold text-[13px] sm:text-[15px] md:text-[19px] lg:text-[24px] leading-[120%] tracking-[0.094em] text-[#1E1E1E] font-['SF Pro Display']">
          {accountNumber}
        </span>
        <button 
          className="relative w-6 h-[25px] flex-shrink-0 hover:opacity-80 transition-opacity"
          onClick={handleCopy}
          aria-label="Copy account number"
        >
          <div className="absolute w-6 h-[25px] left-0 top-0 bg-[#CB3398] rounded-[4px]"></div>
          <svg 
            className="absolute w-[15px] h-[15px] left-1 top-1"
            viewBox="0 0 24 24" 
            fill="none"
          >
            <g>
              <path 
                d="M6 5H15V4C15 2.89543 14.1046 2 13 2H6C4.89543 2 4 2.89543 4 4V15C4 16.1046 4.89543 17 6 17H7V6C7 5.44772 7.44772 5 8 5H6Z" 
                fill="white"
              />
              <path 
                d="M8 7H17V8C17 9.10457 17.8954 10 19 10H20V7C20 5.89543 19.1046 5 18 5H9C7.89543 5 7 5.89543 7 7V18C7 19.1046 7.89543 20 9 20H10V9C10 8.44772 10.4477 8 11 8H8V7Z" 
                fill="white"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

interface TransferNoteProps {
  examples: string[]
}

const TransferNote: React.FC<TransferNoteProps> = ({ examples }) => {
  return (
    <div className="flex flex-col items-start p-6 sm:p-8 md:p-10 gap-5 w-full bg-[#F7F7F7] rounded-[20px]">
      <div className="flex flex-col items-start gap-2 w-full">
        <h3 className="w-full font-medium text-xl sm:text-2xl md:text-[24px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          Transfer Note
        </h3>
        <p className="w-full font-normal text-base sm:text-lg md:text-[24px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
          After making a transfer, please use your name and giving purpose as the transaction description for proper documentation Example:
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-[25px] w-full">
        {examples.map((example, index) => (
          <div 
            key={index}
            className="flex justify-center items-center px-3 sm:px-4 py-2 bg-[#FED2F0] border border-[#CB3398] rounded-[80px] flex-1 min-w-[140px]"
          >
            <span className="font-normal text-sm sm:text-base md:text-[18px] leading-[120%] text-[#CB3398] font-['SF Pro Display'] text-center">
              {example}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const GivingHero: React.FC = () => {
  const transferExamples = [
    'John David - Tithe',
    'Mary Grace - Offering',
    'James Peter - Offering'
  ]

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-[1276px]">
        
        {/* Main Giving Section */}
        <div className="flex flex-col items-center p-[15px] sm:p-5 md:p-[25px] gap-[15px] md:gap-[25px] w-full max-w-[775px] bg-[#FEECF8] rounded-[13px]">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center w-full max-w-[725px]">
            <h1 className="w-full font-medium text-[19px] sm:text-[23px] md:text-[30px] lg:text-[29px] leading-[120%] text-[#1E1E1E] font-['SF Pro Display']">
              Our Account Details
            </h1>
            <p className="w-full max-w-3xl font-normal text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] leading-[120%] text-[#323745] mt-[5px] font-['SF Pro Display']">
              Kindly make your transfer using any of the two account details below
            </p>
          </div>

          {/* Account Cards Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-[25px] w-full max-w-[725px]">
            <AccountCard
              title="Tithe & Offering Account"
              bankName="EcoBank"
              accountName="Mountain of Fire and Miracles Ministeries Youth Church Ojodu"
              accountNumber="4320003155"
            />
            <AccountCard
              title="Church Development Project"
              bankName="EcoBank"
              accountName="Mountain of Fire and Miracles Ministeries Youth Church Ojodu Nehemiah's Team"
              accountNumber="1700049987"
            />
          </div>
        </div>

        {/* Bottom Section: Transfer Note & Scripture */}
        <div className="flex flex-col lg:flex-row items-stretch gap-5 w-full max-w-[1276px]">
          <TransferNote examples={transferExamples} />
          
          {/* Scripture Card */}
          <div className="flex flex-row items-center justify-between p-6 sm:p-8 md:p-10 gap-6 md:gap-[41px] w-full max-w-[519px] bg-[#86085C] rounded-[20px]">
            <div className="flex flex-col items-start gap-2 w-full max-w-[284px]">
              <h3 className="w-full font-medium text-xl sm:text-2xl md:text-[24px] leading-[120%] text-white font-['SF Pro Display']">
                Scripture
              </h3>
              <p className="w-full font-normal text-base sm:text-lg md:text-[24px] leading-[120%] text-white font-['SF Pro Display']">
                God loves a cheerful giver
              </p>
              <p className="w-full font-medium text-base sm:text-lg md:text-[24px] leading-[120%] text-white font-['SF Pro Display']">
                2 Corinthians 9:7
              </p>
            </div>
            
            {/* Quote Icon */}
            <div className="flex-shrink-0 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[98px] md:h-[98px] relative">
             <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.8863 0.53464C10.5113 10.4086 1.96983 21.9012 0.261833 35.0121C-2.39713 55.4229 15.8558 65.4134 25.1043 56.437C34.3529 47.4606 28.8089 36.0671 22.112 32.9527C15.4152 29.8381 11.3198 30.9229 12.0342 26.7609C12.7485 22.5992 22.2762 11.0601 30.6466 5.68623C31.2019 5.214 31.4133 4.2977 30.8785 3.60251C30.5268 3.14538 29.8369 2.24878 28.8089 0.912653C27.91 -0.255731 27.0488 -0.211997 25.8863 0.53464Z" fill="#1E1E1E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M66.3637 0.53464C50.9889 10.4086 42.4474 21.9012 40.7394 35.0121C38.0805 55.4229 56.3334 65.4134 65.5819 56.437C74.8305 47.4606 69.2865 36.0671 62.5897 32.9527C55.8928 29.8381 51.7972 30.9229 52.5118 26.7609C53.2262 22.5992 62.7538 11.0601 71.1243 5.68623C71.6796 5.214 71.8909 4.2977 71.356 3.60251C71.0044 3.14538 70.3145 2.24878 69.2865 0.912653C68.3876 -0.255731 67.5264 -0.211997 66.3637 0.53464Z" fill="#1E1E1E"/>
</svg>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GivingHero