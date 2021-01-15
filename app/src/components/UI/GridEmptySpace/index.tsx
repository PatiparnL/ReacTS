import React from 'react'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const HIDDEN = 'hidden'

const GridSupportingHidingAtSpecifiedBreakpoints = styled(Grid)`
  @media (min-width: ${(p) => p.theme.breakpoints.values.xs}px) {
    display: ${(p: any) => (p.xs === HIDDEN ? 'none' : 'flex')};
  }
  @media (min-width: ${(p) => p.theme.breakpoints.values.sm}px) {
    display: ${(p: any) => (p.sm === HIDDEN ? 'none' : 'flex')};
  }
  @media (min-width: ${(p) => p.theme.breakpoints.values.md}px) {
    display: ${(p: any) => (p.md === HIDDEN ? 'none' : 'flex')};
  }
  @media (min-width: ${(p) => p.theme.breakpoints.values.lg}px) {
    display: ${(p: any) => (p.lg === HIDDEN ? 'none' : 'flex')};
  }
  @media (min-width: ${(p) => p.theme.breakpoints.values.xl}px) {
    display: ${(p: any) => (p.xl === HIDDEN ? 'none' : 'flex')};
  }
`

const Presentation: React.FC<any> = (props) => (
  <GridSupportingHidingAtSpecifiedBreakpoints item {...props} />
)

export const GridEmptySpace = withTheme(Presentation)
