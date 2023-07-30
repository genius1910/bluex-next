"use client";

import { Fragment } from 'react'
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import ChevronDownIcon from '@/images/icon/chevron-down.svg'


interface OptionGroupType {
  label?: string;
  options: OptionType[];
  icon?: React.ReactNode,
}

interface OptionType {
  label: string;
  url: string;
  className?: string;
  icon?: React.ReactNode,
}

interface MainMenuProps {
  title: string;
  optionGroups?: OptionGroupType[]; // if optionGroups is defined, options is ignored
  options?: OptionType[]; // used when optionGroups is not defined
  buttonClassName?: string;
  groupClassName?: string;
}

export function MainMenu({ title, optionGroups, options, buttonClassName, groupClassName }: MainMenuProps) {
  const groups = optionGroups || [{ options: options || [] }];
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div key="d1">
            <Menu.Button
              className={`inline-flex w-full justify-center items-center border-none bg-transparent px-2.5 py-2 text-sm font-medium text-white font-menu leading-[1.57rem] ${buttonClassName || ''}`}
            >
              {title}
              <ChevronDownIcon
                className={`-mr-1 h-6 w-6 text-white transform duration-150 ${open ? 'rotate-180' : 'rotate-0'}`}
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
                `before:content-[""] before:absolute before:top-[-0.313rem] before:w-0 before:h-0 before:border-b-[0.313rem] before:border-b-white before:border-x-[0.313rem]
                before:border-x-transparent before:border-solid before:left-10
                absolute left-0 z-10 mt-0 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${groupClassName || ''}`
              }
            >
              { groups.map((optionGroup, idx) => (
                <div
                  key={`${optionGroup.label}-${idx}`}
                  className="py-1"
                >
                  { optionGroup.label && (
                    <Menu.Item
                      as="span"
                      className="text-xs text-gray-900 block px-4 py-2"
                    >
                      { optionGroup.label }
                    </Menu.Item>
                  ) }
                  { optionGroup.options.map((option) => (
                    <Menu.Item
                      as={Fragment}
                      key={option.label}
                    >
                      <Link
                        href={ option.url }
                        className={`flex flex-row items-center text-gray-900 block text-xs px-4 py-2 hover:bg-gray-200 ${option.className || ''}`}
                      >
                        { option.icon }
                        { option.label }
                      </Link>
                    </Menu.Item>
                  )) }
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
