import React from 'react'
import Square from '../square'
import { TURNS } from '../board/constants'

export default function Turn({isSelected}) {
  return (
    <section className="turn">
        <Square isSelected={isSelected}>{TURNS.X}</Square>
        <Square isSelected={!isSelected}>{TURNS.O}</Square>
      </section>
  )
}
