export default function BlogPreviewLoading() {
  return (
    <div
      className='flex flex-col lg:flex-row'
    >
      <div
        className='flex-auto w-full mr-auto mb-5 lg:flex-[0_0_23.75rem] lg:w-[23.75rem] lg:max-h-[17.5rem] lg:mr-[3.125rem]'
      >
        <span className='skeleton h-[17.5rem]'></span>
      </div>
      <div
        className='flex-auto flex flex-col justify-start'
      >
        <span className='skeleton h-[3.75rem] mb-2.5'></span>
        <span className='skeleton h-[1.125rem] mb-2.5'></span>
        <span className='skeleton h-[8.25rem] mb-5'></span>
        <span className='skeleton w-36 h-9'></span>
      </div>
    </div>
  )
}
