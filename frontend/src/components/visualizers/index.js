import ArrayVisualizer from './ArrayVisualizer'
import StackVisualizer from './StackVisualizer'
import LinkedListVisualizer from './LinkedListVisualizer'
import SearchVisualizer from './SearchVisualizer'

const VISUALIZER_MAP = {
  'array':       ArrayVisualizer,
  'stack':       StackVisualizer,
  'linked_list': LinkedListVisualizer,
  'binary-search': SearchVisualizer,
  'linear-search': SearchVisualizer,
  
}

export default VISUALIZER_MAP