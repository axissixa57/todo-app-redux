import { bindActionCreators } from 'redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useMemo } from 'react'
// эти hoocks скопипащены из офиц. документации redux и успешно используются
export function useActions(actions, deps) {
  // возращает ссылку на redux-овский dispatch()
  const dispatch = useDispatch()
  // добавляет такую конструкцию чтобы уменьшить кол-во работы,
  // useMemo используется чтобы компоненты зря не перерендерелись, на каждый рендер когда мы будем создавать наш коллбек для dispatch-а
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch))
    }
    // используется для того чтобы мы не делали arrow fuctions
    // bindActionCreators замена mapDispatchToProp из connect(mapStateToProps,mapDispatchToProp)
    return bindActionCreators(actions, dispatch) 
  }, deps ? [dispatch, ...deps] : [dispatch])
}

export function useShallowEqualSelector(selector) {
  // ф-ция connect у redux сравнивала ссылки и ещё shallow копии, 
  // т.е. при не каждом обновлении props-ов если у props-ов изменилась ссылка, 
  // но значения остались такими же, то connect не запускал рендер
  // а useSelector запустит, он сравнивает только ссылки
  // поэтому он в себя принимает 2-ой параметр, эта ф-ция кот. будте проверять эквивалентность данных
  // shallowEqual на high level ур-вне проверит то что данные не изменились и не запустит рендер, если изменилась ссылка
  return useSelector(selector, shallowEqual)
}