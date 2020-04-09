import React from 'react'
// import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import cls from 'classnames'

export const Pagination: React.FC<{
  page: number,
  count: number,
  perPage?: number,
  setPage: (page: number) => void
}> = ({
  page,
  count,
  perPage = 10,
  setPage
}) => {
  
  const pages = count / perPage
  const first = Math.max(0, page-5)
  const last = Math.min(page+5, pages)

  const pageNumbers: number[] = []
  for ( let i = first; i <= last; i++ ) {
    pageNumbers.push(i)
  }
  
  return (
    <>
      <div className="flex flex-row-reverse">
        <ul className="flex list-reset border border-grey-light rounded bg-white font-sans">
          { pageNumbers.map(_page =>
            <li key={_page}>
              <a className={cls('block px-3 py-2 border-r',
                {
                  'text-white bg-blue-500  hover:bg-blue-700 border-blue': (_page === page),
                  'hover:text-white hover:bg-blue-700 border-grey-light': (_page !== page)
                }
              )} onClick={() => {setPage(_page)}}>{_page + 1}</a>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}
