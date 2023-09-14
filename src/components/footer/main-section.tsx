import React from 'react';
import { LinkType } from '@/constants/page/layout';
import WhiteLogo from '@/images/logo/bluex-logo.inline.svg';
import IconFB from '@/images/icon/icon-fb-3.inline.svg';
import IconYT from '@/images/icon/icon-youtube-3.inline.svg';
import IconTwitter from '@/images/icon/icon-twitter-3.inline.svg';
import IconLinkedin from '@/images/icon/icon-linkedin-3.inline.svg';
import FooterFormSection from './form-section';

const FooterMainSection = () => {
  const locale = 'en';

  const getTimeYear = () => {
    return new Date().getFullYear();
  };

  const socialMediaIconListTemplate = () => {
    return (
      <div
        className="relative mt-[3.125rem] flex w-full flex-row
      justify-center gap-3"
      >
        <a
          className="ml-[0.688rem] flex items-center"
          href="https://www.facebook.com/bluextrade/"
          target="_blank"
          title="facebook"
          rel="noreferrer"
        >
          <IconFB />
        </a>
        <a
          href="https://www.youtube.com/channel/UCeCS7zsN-p5GluHThlPawaQ"
          target="_blank"
          title="youtube"
          rel="noreferrer"
        >
          <IconYT />
        </a>
        <a
          href="https://mobile.twitter.com/BluexTrade"
          target="_blank"
          title="twitter"
          rel="noreferrer"
        >
          <IconTwitter />
        </a>
        <a
          href="https://www.linkedin.com/company/bluex-trade"
          target="_blank"
          title="linkedin"
          rel="noreferrer"
        >
          <IconLinkedin />
        </a>
      </div>
    );
  };

  return (
    <footer>
      <div className="box-border w-full bg-[#11243b]">
        <div className="mx-auto my-0 box-border w-full px-5 lg:w-[60rem]">
          <div className="flex flex-col py-[3.125rem] pb-[1.875rem] text-center md:text-start">
            <div className="mb-[2.5rem] flex flex-col items-center justify-center md:flex-row md:justify-between">
              <a
                href="/"
                className="text-lowercase justify-start p-0"
                aria-label="Logo"
              >
                <WhiteLogo />
              </a>
              <div className="hidden lg:block">
                {socialMediaIconListTemplate()}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start">
              <div className="relative mb-[2rem] mt-[-1rem] flex flex-col flex-wrap md:flex-row lg:mb-0">
                {[
                  {
                    title: 'Products',
                    links: [
                      {
                        label: 'BlueX e-Commerce',
                        url: '/ecommerce/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Vendors',
                        url: '/vendor/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Payers',
                        url: '/pay-it-later/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Developers',
                        url: '/for-developer/',
                        type: 'INTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Company',
                    links: [
                      {
                        label: 'ABOUT US',
                        url: '/about-us/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'PRESS',
                        url: '/in-the-news/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'CAREERS',
                        url: '/careers/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'Security',
                        url: '/security/',
                        type: 'INTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Resources',
                    links: [
                      {
                        label: 'FAQ',
                        url: 'https://support.bluexpay.com/en/knowledge',
                        type: 'EXTERIOR',
                      },
                      {
                        label: 'BLOG',
                        url: '/blog/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'PRODUCT STATUS',
                        url: 'https://status.bluexpay.com/#/past_30_days',
                        type: 'EXTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Keep in Touch',
                    links: [
                      {
                        label: 'US: +1-855-832-BLUE',
                        url: '',
                        type: 'TEXT',
                      },
                      {
                        label: 'ASIA: +886-2-2500-7833',
                        url: '',
                        type: 'TEXT',
                      },
                      {
                        label: 'info@bluextrade.com',
                        url: '',
                        type: 'TEXT',
                      },
                    ],
                  },
                ].map(({ title, links }, index) => (
                  <div
                    className={`flex-[0 0 50%] my-[1rem] flex flex-col font-[lato] text-[0.875rem] text-base font-normal leading-[1.5rem] tracking-normal md:w-1/2 ${
                      index === 0 ? null : 'mt-[3.125rem] md:mt-[1rem]'
                    }`}
                    key={`sitemap-${index}`}
                  >
                    <div className="text-[#d7d7d7] leading-6 text-sm font-normal tracking-normal font-[lato]">{title}</div>
                    {links?.map(({ label, url, type }, linkIndex) => (
                      <span
                        className="mt-[0.625rem] flex min-w-[5rem] justify-center text-sm font-normal leading-6 text-white md:justify-start"
                        key={`sitemap-${index}-link-${linkIndex}`}
                      >
                        {type === LinkType.INTERIOR && (
                          <a
                            href={'/' + locale + url}
                            className="justify-center p-0 uppercase text-white md:justify-start"
                          >
                            {label}
                          </a>
                        )}
                        {type === LinkType.EXTERIOR && (
                          <a
                            className="text-white"
                            href={url}
                            target="_blank"
                            title="linkedin"
                            rel="noreferrer"
                          >
                            {label}
                          </a>
                        )}
                        {type === LinkType.TEXT && (
                          <span className="">{label}</span>
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <FooterFormSection />
              <div className="block lg:hidden">
                {socialMediaIconListTemplate()}
              </div>
            </div>
          </div>
          <div className="font-roboto flex flex-col items-center justify-end border-t-[1px] border-[#ffffff33] py-[1.875rem] text-[0.75rem] font-bold leading-normal tracking-normal md:flex-row">
            {[
              {
                label: 'BlueX Trade Terms of Service',
                url: '/bluextrade-terms-of-service',
              },
              {
                label: 'BlueX Trade Privacy Policy',
                url: '/bluextrade-terms-of-service',
              },
              { label: 'Cookie Policy', url: '/bluextrade-terms-of-service' },
            ].map(({ label, url }, index) => (
              <div
                className="ml-[1.25rem] inline-flex items-center text-white"
                key={`infobar-${index}`}
              >
                <a className="leading-normal tracking-normal font-[Roboto-Medium] text-xs font-bold text-white" href={url}>
                  {label}
                </a>
                <div className="ml-[10px] hidden md:block">|</div>
              </div>
            ))}
            <div className="ml-[1.25rem] inline-flex items-center leading-normal tracking-normal font-[Roboto-Medium] text-xs font-bold text-white">
              {`©  ${getTimeYear()} ${'BlueX Trade, All Rights Reserved.'}`}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMainSection;
