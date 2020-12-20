import React from 'react'

export const Content: React.FC<{
  content: string,
  className: string
}> = ({
  content,
  className,
  ...rest
}) => (
  <>
    { content && <div className={className} {...rest} dangerouslySetInnerHTML={{ __html: content }} /> }
  </>
)