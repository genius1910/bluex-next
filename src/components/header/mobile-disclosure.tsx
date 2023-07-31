"use client";

import { LinkTarget, LinkType, LocalizedContent } from '@/cms/header';
import { Locale } from '@/cms/langs';
import { AvailableLocaleType } from '@/cms/types';
import CloseIcon from '@/images/icon/close.svg';
import MenuIcon from '@/images/icon/menu.svg';
import NavBeforeIcon from '@/images/icon/nav-before.svg';
import NavNextIcon from '@/images/icon/nav-next.svg';
import { Disclosure, Transition } from '@headlessui/react';
import { Button, Slide } from "@mui/material";
import Link from 'next/link';
import { useState } from 'react';

interface MenuDrarwerProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  open: boolean;
  links: LinkTarget[];
  onExited?: () => void | undefined;
}

function MenuDrarwer({ content, locale, open, links, onExited }: MenuDrarwerProps) {
  const [active, setActive] = useState(true)
  return <Slide
    direction="left"
    in={open && active}
    mountOnEnter
    onExited={onExited}
    >
      <div
        className='fixed box-border w-screen min-h-[calc(100vh_-_5.875rem)] bg-[white] pt-[0.312rem] left-0 top-[5.875rem]'
      >
        <div
          className="flex flex-col mb-[0.938rem]"
        >
            <Button
              sx={{width: '100%', textTransform: 'initial', letterSpacing: 'normal', lineHeight: '1.57rem', padding: '0.938rem 1.25rem 0.938rem 1.875rem'}}
              onClick={() => setActive(false)}
            >
              <div
                className='w-full flex text-primary text-sm font-menu font-medium leading-[1.57rem] text-inital'
              >
                <NavBeforeIcon className="w-6 h-6" />
                <span className='ml-3'>{content.Header_Back_Btn}</span>
              </div>
            </Button>

          {
            links.map(
              ({ label, url, type }, index) => (
                <div
                  key={`mobile-menu-${index}`}
                >
                  <Button
                    sx={{width: '100%', textTransform: 'initial', letterSpacing: 'normal', lineHeight: '1.57rem', padding: '0.938rem 1.25rem 0.938rem 1.875rem'}}
                  >
                    { type === LinkType.Text ? (
                      <div>{label}</div>
                    ) : (
                      <Link
                        key={`mobile-menu-${index}`}
                        className='w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] text-inital'
                        href={type === LinkType.Interior ? `/${locale}${url}` : url || '#'}
                      >
                        {label}
                      </Link>
                    )}
                  </Button>
                </div>
              )
            )
          }
        </div>
      </div>
    </Slide>
}

interface MenuPanelProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
  open: boolean;
}

function MenuPanel({ content, locale, allLocales, open}: MenuPanelProps) {
  const [drawActive, setDrawActive] = useState(false)
  const [submenuLinks, setSubmenuLinks] = useState<LinkTarget[]>([])
  return (
    <>
      <Slide
        direction="down"
        in={open}
        mountOnEnter
        unmountOnExit
      >
        <div
          className='fixed box-border w-screen min-h-[calc(100vh_-_5.875rem)] bg-[white] pt-[0.312rem] left-0 top-[5.875rem]'
        >
          <div
            className="flex flex-col mb-[0.938rem]"
          >
            {
              content.Header_SubMenus.map(
                ({ links, title, attachment }, index) => (
                  <div
                    key={`mobile-menu-${index}`}
                  >
                    {links.length > 0 ? (
                      <Button
                        sx={{width: '100%', textTransform: 'initial', letterSpacing: 'normal', lineHeight: '1.57rem', padding: '0.938rem 1.25rem 0.938rem 1.875rem'}}
                        onClick={() => {
                          setDrawActive(true)
                          setSubmenuLinks(links)
                        }}
                      >
                        <div
                          className='w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] justify-between text-inital'
                        >
                          <span>{title}</span>
                          <NavNextIcon className="w-6 h-6" />
                        </div>
                      </Button>
                    ) : (
                      <Button
                        sx={{width: '100%', textTransform: 'initial', letterSpacing: 'normal', lineHeight: '1.57rem', padding: '0.938rem 1.25rem 0.938rem 1.875rem'}}
                      >
                        <Link
                          key={`mobile-menu-${index}`}
                          className='w-full flex text-submenu text-sm font-menu font-medium leading-[1.57rem] text-inital'
                          href={attachment || '#'}
                        >
                          {title}
                        </Link>
                      </Button>
                    )}
                  </div>
                )
              )
            }
          </div>
          <div
            className="flex flex-col"
          >
            {/* {displaySetting.Localization && isI18n && (
              <MenuI18n>
                <Button
                  onClick={() =>
                    onSwitchMobileMenu(HeaderMobileMenu.I18N)
                  }
                >
                  <span>{i18n}</span>
                  <NavigateNextIcon />
                </Button>
              </MenuI18n>
            )} */}

            <div // sign in button
              className="flex justify-center"
            >
              <Button
                sx={{textTransform: 'initial', width: '6.6rem', height: '2rem', backgroundColor: '#009bd2', borderRadius: '18px', border: 'none', letterSpacing: 'normal', '&:hover': {backgroundColor: '#009bd2'}}}
                >
                <Link
                  className="flex text-sm leading-normal font-btn font-bold normal-case text-center text-white px-2 py-1.5 items-center justify-center"
                  href={content.Header_SignIn_Btn?.link || '/'}
                >
                  <span>{content.Header_SignIn_Btn?.text}</span>
                  <NavNextIcon className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Slide>

      { drawActive &&
        <MenuDrarwer
          content={content}
          locale={locale}
          links={submenuLinks}
          open={drawActive}
          onExited={() => setDrawActive(false)}
        />
      }
    </>
  )
}

export interface MobileDisclosureProps {
  content: LocalizedContent;
  locale: AvailableLocaleType;
  allLocales: Locale[];
}

export default function MobileDisclosure({ content, locale, allLocales }: MobileDisclosureProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="mx-5 my-auto w-6 h-6">
            { open ? <CloseIcon /> : <MenuIcon /> }
          </Disclosure.Button>

          <Transition
            className="absolute w-full bg-white top-0"
            show={open}
            enter="transition ease duration-500 transform"
            enterFrom="opacity-0 -translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-12"
          >
            {/*
              Don't forget to add `static` to your `Disclosure.Panel`!
            */}
            <Disclosure.Panel static>
              <MenuPanel content={content} locale={locale} allLocales={allLocales} open={open} />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
