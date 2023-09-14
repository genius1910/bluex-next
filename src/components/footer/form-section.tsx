'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PrimaryLogo from '@/images/logo/logo-bluexpay.inline.svg';

const FooterFormSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [firstCheck, setFirstCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setCompany('');
    setFirstCheck(false);
  }, []);

  const onHandleSubmit = async (event: any) => {
    event.preventDefault();
    setFirstCheck(true);
    if (!firstName || !lastName || !email || !company) {
      return;
    }

    setLoading(true);

    // TODO: send out subscriptions
    // try {
    //   (window as any).bxt &&
    //     (window as any).bxt('subscribeForm', {
    //       username: firstName + lastName,
    //       email: email,
    //       company: company,
    //     });
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   await setTimeout(() => {
    //     setShowModal(true);
    //     setLoading(false);
    //   }, 750);
    // }
  };

  return (
    <>
      <form
        className=" w-full md:w-[25.625rem]"
        onSubmit={(event) => onHandleSubmit(event)}
      >
        <div className=" font-lato whitespace-pre-wrap text-center text-[0.875rem] font-normal leading-normal tracking-normal text-white opacity-70 md:text-start">
          Sign up to get the latest news in freight and fintech
        </div>
        <div className="relative m-0 flex w-full min-w-[0] flex-col border-0 p-0 align-top md:flex-row">
          <input
            className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded border-none bg-[#1b314c] p-2 px-[10px] py-[12px] !font-sans text-xs font-medium text-white placeholder:text-xs placeholder:text-[#5b77ab] ${
              firstCheck && !firstName ? 'illegal' : ''
            }`}
            type="text"
            value={firstName}
            placeholder={'First Name'}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value)
            }
          />
          <input
            className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded border-none bg-[#1b314c] p-2 px-[10px] py-[12px] !font-sans text-xs font-medium text-white placeholder:text-xs placeholder:text-[#5b77ab] md:ml-[0.625rem] ${
              firstCheck && !firstName ? 'illegal' : ''
            }`}
            type="text"
            value={lastName}
            placeholder={'Last Name'}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(event.target.value)
            }
          />
        </div>
        <div className="relative m-0 flex w-full min-w-[0] flex-row border-0 p-0 align-top">
          <input
            className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded border-none bg-[#1b314c] p-2 px-[10px] py-[12px] !font-sans text-xs font-medium text-white placeholder:text-xs placeholder:text-[#5b77ab] ${
              firstCheck && !firstName ? 'illegal' : ''
            }`}
            type="email"
            value={email}
            placeholder={'Email'}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </div>
        <div className="relative m-0 flex w-full min-w-[0] flex-row border-0 p-0 align-top">
          <input
            className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded border-none bg-[#1b314c] p-2 px-[10px] py-[12px] !font-sans text-xs font-medium text-white placeholder:text-xs placeholder:text-[#5b77ab] ${
              firstCheck && !firstName ? 'illegal' : ''
            }`}
            type="text"
            value={company}
            placeholder={'Company'}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCompany(event.target.value)
            }
          />
        </div>
        <button
          className="mt-[0.625rem] h-[2.25rem] w-full cursor-pointer rounded-none border-none bg-[#009bd2] p-[0.375rem] px-[0.5rem] text-center font-[lato] text-[1rem] font-bold capitalize leading-normal text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress className="!h-6 !w-6" />
          ) : (
            <>{'Subscribe'}</>
          )}
        </button>
      </form>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div
          className={`w-[calc(100vw - 2.5rem)] shadow-[0 0 20px 0 rgba(0, 0, 0, 0.1)] max-h-max-content absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-[0.625rem] bg-white !outline-none lg:w-[22.5rem] lg:overflow-hidden`}
        >
          <div className="relative box-border flex h-full flex-col overflow-hidden px-[1.25rem] py-[1.875rem]">
            <div className="mb-[6.875rem]">
              <PrimaryLogo />
            </div>
            <div className="mb-[3.125rem]">
              <div className="whitespace-pre-wrap text-center font-[lato] text-[1rem] font-bold leading-normal tracking-normal text-[#18335e]">
                Thank you for subscribing.
              </div>
            </div>
            <button
              className="font-inter mt-[2.5rem] h-[3rem] cursor-pointer rounded-[0.25rem] border-none bg-[#009bd2] p-[0.375rem] px-[0.5rem] text-center text-[0.75rem] font-bold capitalize leading-normal tracking-normal text-white"
              onClick={() => setShowModal(false)}
            >
              Finish
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FooterFormSection;
