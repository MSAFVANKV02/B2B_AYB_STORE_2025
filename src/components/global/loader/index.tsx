import React from 'react'
import { Spinner } from './spinner'
import { cn } from '@/lib/utils'

type Props = {
  state: boolean
  className?: string
  color?: string
  children?: React.ReactNode
  spinnerClassName?:string

}

const Loader = ({ state, className, color, children, spinnerClassName }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} spinnerClassName={spinnerClassName} />
    </div>
  ) : (
    children
  )
}

export default Loader
