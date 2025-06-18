import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import type { IProduct } from "../interface";
import type { ChangeEvent } from "react";

interface IProps {
  product: IProduct;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeThumbnail:(e: ChangeEvent<HTMLInputElement> ) => void;
}

const FormToModal = ({ product, onChange, onSelect,onChangeThumbnail }: IProps) => {
  return (
    <form>
      <FormControl my={2}>
        <FormLabel>title</FormLabel>
        <Input type="" value={product.title} name="title" onChange={onChange} />
      </FormControl>

      <FormLabel>Description</FormLabel>
      <Textarea
        placeholder="Here is a sample placeholder"
        value={product.description}
        name="description"
        onChange={onChange}
      />

      <FormControl my={2}>
        <FormLabel>Price</FormLabel>
        <Input type="number" value={product.price} name="price" onChange={onChange} />
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Stock</FormLabel>
        <Input type="number" value={product.stock} name="stock" onChange={onChange} />
      </FormControl>


<FormControl my={2}>
<FormLabel>Select Category</FormLabel>

        <Select
          my={2}
          value={product.categories?.[0].title ?? " "}
          name="categories"
          onChange={onSelect}
        >
          <option value={"camera"}> camera</option>
          <option value={"smartPhones"}>smart Phone</option>
          <option value={"laptop"}> Laptop</option>
        </Select>
      </FormControl>
      <InputGroup>
        <Input name='thumbnail' onChange={onChangeThumbnail} type="file" h={"100%"} ps={0} p={2} />
      </InputGroup> 

     
    </form>
  );
};

export default FormToModal;
