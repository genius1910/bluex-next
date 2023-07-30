"use client";

import { LocalizedContent } from '@/cms/header';
import { Locale } from '@/cms/langs';
import { AvailableLocaleType } from '@/cms/types';
import ChevronDownIcon from '@/images/icon/chevron-down.svg';
import CloseIcon from '@/images/icon/close.svg';
import MenuIcon from '@/images/icon/menu.svg';
import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import ConsoleLog from '../tools/console-log';

export interface MobileDisclosureProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}


export default function MobileDisclosure({ content, locale }: MobileDisclosureProps) {
  `
.a{
    @apply text-[rgb(24,51,94)];
}`
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="mx-5 my-auto w-6 h-6">
            { open ? <CloseIcon /> : <MenuIcon /> }
          </Disclosure.Button>

          {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
          <Transition
            className="absolute w-full bg-white top-0"
            show={open}
            enter="transition ease duration-500 transform"
            enterFrom="opacity-0 -translate-y-12"
            enterTo="opacity-100 translate-y-[5.875rem]"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-12"

            // enter="transition duration-100 ease-out"
            // enterFrom="transform scale-95 opacity-0"
            // enterTo="transform scale-100 opacity-100"
            // leave="transition duration-75 ease-out"
            // leaveFrom="transform scale-100 opacity-100"
            // leaveTo="transform scale-95 opacity-0"
          >
            {/*
              Don't forget to add `static` to your `Disclosure.Panel`!
            */}
            <Disclosure.Panel static>
              { content.Header_SubMenus.slice(1).map(({ title, attachment, links }, index) => {
                return links.length > 0 ? (
                  <Disclosure
                    key={`mm-menu-${index}`}
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] pl-[1.875rem] pr-5 py-[0.938rem] justify-between hover:bg-gray-200">
                          { title }
                          <ChevronDownIcon className={`mx-5 my-auto w-6 h-6 transform duration-150 ${open ? 'rotate-0' : '-rotate-90'}`}/>
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel static>
                            <Link
                              key={`mm-link-${index}`}
                              href={`/${locale}${attachment}`}
                              className='w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] pl-[1.875rem] pr-5 py-[0.938rem] hover:bg-gray-200'
                            >
                              {title}
                            </Link>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                    </Disclosure>
                ) : (
                  <Link
                    key={`mm-link-${index}`}
                    href={`/${locale}${attachment}`}
                    className='w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] pl-[1.875rem] pr-5 py-[0.938rem] hover:bg-gray-200'
                  >
                    {title}
                  </Link>
                )
              })}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
