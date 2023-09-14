"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@/images/icon/chevron-down.svg";
import { formatClassSpacePrefix } from "@/lib/format";

interface OptionGroupType {
  label?: string;
  options: OptionType[];
  icon?: React.ReactNode;
}

interface OptionType {
  label: string;
  url: string;
  className?: string;
  icon?: React.ReactNode;
}

interface MainMenuProps {
  title: string;
  optionGroups?: OptionGroupType[]; // if optionGroups is defined, options is ignored
  options?: OptionType[]; // used when optionGroups is not defined
  buttonClassName?: string;
  groupClassName?: string;
}

export function MainMenu({
  title,
  optionGroups,
  options,
  buttonClassName,
  groupClassName,
}: MainMenuProps) {
  const groups = optionGroups || [{ options: options || [] }];
  const buttonClass = formatClassSpacePrefix(buttonClassName);
  const groupClass = formatClassSpacePrefix(groupClassName);
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div key="d1">
            <Menu.Button
              id=""
              className={`inline-flex w-full items-center justify-center border-none bg-transparent px-2.5 py-2 font-menu text-sm font-medium leading-[1.57rem] text-header${buttonClass}`}
            >
              {title}
              <ChevronDownIcon
                className={`-mr-1 h-6 w-6 transform text-current duration-150 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
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
              className={`absolute left-0 z-10 mt-0 w-56 origin-top-left rounded-md bg-white
                shadow-lg ring-1 ring-black
                ring-opacity-5 before:absolute before:left-10 before:top-[-0.313rem] before:h-0 before:w-0 before:border-x-[0.313rem] before:border-b-[0.313rem] before:border-solid before:border-x-transparent before:border-b-white before:content-[""]
                focus:outline-none${groupClass}`}
            >
              {groups.map((optionGroup, index) => (
                <div key={`${optionGroup.label}-${index}`} className="py-1">
                  {optionGroup.label && (
                    <Menu.Item
                      as="span"
                      className="block px-4 py-2 text-xs text-submenu"
                    >
                      {optionGroup.label}
                    </Menu.Item>
                  )}
                  {optionGroup.options.map((option) => {
                    const optClass = formatClassSpacePrefix(option.className);
                    return (
                      <Menu.Item as={Fragment} key={option.label}>
                        <Link
                          href={option.url}
                          className={`block flex flex-row items-center px-4 py-2 text-xs hover:bg-gray-200 text-submenu${optClass}`}
                        >
                          {option.icon}
                          {option.label}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
