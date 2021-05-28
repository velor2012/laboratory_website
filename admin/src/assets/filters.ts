import _ from 'lodash'
export function str2array(value:string,splitby:string) {
    if (_.isEmpty(value)) return []
    value = value.toString()
    return value.split(splitby)
}
export function array2str(value:string[],combineBy:string) {
    if (_.isEmpty(value)) return ''
    return value.join(combineBy);
  }
  