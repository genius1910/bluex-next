import SearchIcon from '@/images/icon/search.svg';
import CloseIcon from '@/images/icon/close.svg';

export default function SearchBox({ search, onChange }: { search: string, onChange: (value: string) => void }) {
  return (
    <div
      className="flex items-center w-full lg:w-[18.75rem] box-border shadow-[0_2px_5px_0_#8497b9] text-primary pl-4 pr-1 py-1 border-l-[5px] border-l-primary"
    >
      <SearchIcon
        className="select-none w-6 h-6 inline-block fill-current"
      />
      <div
        className='relative inline-flex items-center flex-1 ml-2 text-base leading-[1.4375em] tracking-[0.00938em] text-black box-border cursor-text'
      >
        <input
          className='box-content h-[1.4375em] block w-full m-0 pt-1 pb-[5px] px-0 border-0 font-title focus:outline-none'
          placeholder='Search'
          value={ search }
          onChange={ (e) => {
            onChange(e.target.value)
          } }
        />
      </div>
      <button
        className='flex items-center flex-[0_0_2.5rem]'
      >
        <CloseIcon
          className="select-none w-6 h-6 inline-block fill-current"
        />
      </button>

    </div>
  )
}
