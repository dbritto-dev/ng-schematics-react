import { render, screen } from '@testing-library/react'
import { <%= className %> } from './<%= fileName %>'

describe('<%= className %>', () => {
  it('Should render successfully', () => {
    render(<<%= className %> />)

    expect(screen.getByText(/welcome to <%= name %>/i)).toBeInTheDocument()
  })
})
