import React, { ReactNode } from 'react'
import { MdChevronRight, MdChevronLeft } from 'react-icons/md'
import cls from 'classnames'

export const Pagination: React.FC<{
  activepage: number,
  count: number,
  perPage?: number,
  setPage: (page: number) => void
}> = ({
  activepage,
  count,
  perPage = 10,
  setPage
}) => {
  
  const pages = Math.floor((count - 1) / perPage)
  const first = Math.max(0, activepage - 2)
  const last = Math.min(activepage + 2, pages)

  const pageNumbers: number[] = []
  for ( let i = first; i <= last; i++ ) {
    pageNumbers.push(i)
  }
  if (pageNumbers.length < 2) {
    return null
  }
  
  return (
    <>
      <div className="flex flex-row-reverse">
        <ul className="flex list-reset border border-grey-light rounded bg-white font-sans">
          {(pageNumbers[0] > 0) &&
            <Item page={0} activepage={activepage} setPage={setPage}>
              <MdChevronLeft />
            </Item>
          }
          {pageNumbers.map(page =>
            <Item key={page} page={page} activepage={activepage} setPage={setPage}>
              {page + 1}
            </Item>
          )}
          {(pageNumbers[pageNumbers.length-1] < pages) &&
            <Item page={pages - 1} activepage={activepage} setPage={setPage}>
              <MdChevronRight />
            </Item>
          }
        </ul>
      </div>
    </>
  )
}

const Item: React.FC<{
  children: ReactNode,
  page: number,
  activepage: number,
  setPage: (page: number) => void
}> = ({
  children,
  page,
  activepage,
  setPage
}) => (
  <li className={cls('block px-3 py-2 border-r',
    {
      'text-white bg-blue-500  hover:bg-blue-700 border-blue': (page === activepage),
      'hover:text-white hover:bg-blue-700 border-grey-light': (page !== activepage)
    })}
    onClick={() => {setPage(page)}}>
      {children}
  </li>
)