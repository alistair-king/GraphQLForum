import React, { ReactNode } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'

export const AnimatedSwitch: React.FC<{
  children: ReactNode
}> = ({
  children
}) => {
  const location = useLocation()
  const reverse = location.pathname === '/forum'

  return (
    <PoseGroup
      flipMove={false}
      preEnterPose={reverse ? 'leftSide' : 'rightSide'}
      exitPose={reverse ? 'rightSide' : 'leftSide'}
    >
      <ContextRouteAnimation key={location.pathname} reverse={reverse}>
        <Switch location={location}>
          {children}
        </Switch>
      </ContextRouteAnimation>
    </PoseGroup>
  )
}


const ContextRouteAnimation = posed.div({
  enter: {
    x: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 200
    }
  },
  leftSide: {
    x: '-100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 200
    }
  },
  rightSide: {
    x: '100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 200
    }
  }
})