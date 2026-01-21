import type { ComponentType } from 'react'
import type { FooterGlobal, HeaderGlobal } from '@repo/shared'

export interface BoltBlockBase {
  blockType: string
  id?: string | number
}

export type BlockComponent<TBlock extends BoltBlockBase = BoltBlockBase> = ComponentType<{
  block: TBlock
}>

export type BlockRegistry<TBlock extends BoltBlockBase = BoltBlockBase> = Record<
  string,
  BlockComponent<TBlock>
>

export type TemplateComponent<TProps = Record<string, unknown>> = ComponentType<TProps>

export interface HeaderProps {
  data: HeaderGlobal
  className?: string
}

export interface FooterProps {
  data: FooterGlobal
  className?: string
}
