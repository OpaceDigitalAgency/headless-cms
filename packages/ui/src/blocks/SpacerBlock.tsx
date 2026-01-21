interface SpacerBlockProps {
  block: {
    style?: 'space' | 'divider'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    lineStyle?: 'solid' | 'dashed' | 'dotted'
  }
}

const sizeClasses = {
  xs: 'py-2',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
  xl: 'py-16',
}

export function SpacerBlock({ block }: SpacerBlockProps) {
  const size = block.size || 'md'
  const style = block.style || 'space'
  const lineStyle = block.lineStyle || 'solid'

  return (
    <div className={`container ${sizeClasses[size]}`}>
      {style === 'divider' && <hr className={`border-t border-gray-200 ${lineStyle}`} />}
    </div>
  )
}
