import React from 'react'

// Get props from Apps
type PropsFromComponent<Component> = Component extends React.FC<infer Props> 
  ? Props
  : Component extends React.Component<infer Props>
  ? Props
  : never

const App = (props: {title: string, pageAmount: number}) => {
  return null
}

class ClassicComponent extends React.Component<{title: string}> {
}

type AppProps = PropsFromComponent<typeof App>

type ClassicComponentProps = PropsFromComponent<ClassicComponent> 
