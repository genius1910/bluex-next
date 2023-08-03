"use client";

import { Fragment, useState } from 'react'
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import ChevronDownIcon from '@/images/icon/chevron-down.svg'

interface OptionType {
  label: string;
  value: string;
  url: string;
  className?: string;
  onClick?: () => void;
}

export default function FilterDropDown({ placeholder, current, options }: { placeholder: string, current?: string | null, options: OptionType[] }) {
  const [currentOption, setCurrentOption] = useState(options.find(o => o.value === current));
  const onClick = (option: OptionType) => {
    setCurrentOption(option);
    option.onClick && option.onClick();
  }

  return (
    <Menu
      as="div"
      className="relative w-full mb-[1rem] lg:w-60 lg:mb-0"
    >
      {({ open }) => (
        <>
          <div key="d1">
            <Menu.Button
              className='flex items-center w-full justify-between shadow-[0_2px_5px_0_#8497b9] text-primary px-2.5 py-2 border-l-[5px] border-l-primary'
            >
              { !currentOption ? <span className='text-gray-400'>{placeholder}</span> : currentOption.label }

              <ChevronDownIcon
                className={`-mr-1 h-6 w-6 fill-current transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`}
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={
                `absolute left-0 z-10 mt-0 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `
              }
            >
              { options.map((option) => (
                  <div
                  key={option.url}
                  >
                  <Menu.Item
                    as={Fragment}
                  >
                    <Link
                      href={option.url}
                      className={`block items-center text-primary px-4 py-2 hover:bg-gray-200`}
                      onClick={() => onClick(option)}
                    >
                      { option.label }
                    </Link>
                  </Menu.Item>

                  </div>
                ))
              }
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
