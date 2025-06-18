import { Select } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
interface IProps {
  categories: string[];
  value:string;
  onChange:(e:ChangeEvent<HTMLSelectElement>)=>void;
}
const SelectCategory = ({ categories,value ,onChange}: IProps) => {
  return (
    <Select value={value} onChange={onChange} >
      {categories.map((value, i) => (
        <option key={i} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};
export default SelectCategory;
