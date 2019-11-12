import { NavigateType } from '../../../types';

export interface IProps {
  path: AMap.LocationValue[];
  type: NavigateType;
  navigateOptions?: { [key: string]: any };
}

declare function Navigate(props: IProps): any;

export default Navigate;
