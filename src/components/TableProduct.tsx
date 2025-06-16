import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  useDisclosure,
  Input,
  Img,
} from "@chakra-ui/react";
import { initialProduct, type IProduct } from "../interface";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AlertDialogComponent from "../shared/AlertDialog";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useDeleteProductDashMutation } from "../app/Services/GetProductDash";
import ModalCustom from "../shared/ModalCustom";
import { ModalInputData } from "../data";
interface IProps {
  products: IProduct[];
}
const TableProduct = ({ products }: IProps) => {
  //1- state
  const [tempDocumentID, setTempDocumentId] = useState("");
  const [tempProduct, setTempProduct] = useState<IProduct>(initialProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [deleteProduct, { isLoading, isSuccess }] =
    useDeleteProductDashMutation();

  //For Modal
  const initialRefEdit = useRef(null);
  const finalRefEdit = useRef(null);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  //2- Handler
  const HandleDeleteProduct = () => {
    deleteProduct(tempDocumentID);
  };
  const onChange_Handle_EditModal =(e:ChangeEvent<HTMLInputElement>)=>{
    const {value , name} = e.target;
   setTempProduct((prev) =>( {...prev , [name] :value}));
  }
  const onSubmit_Handle_Edit = () =>{
    console.log(tempProduct)
    //Tomorrow after Went Exam
    //1- push New Edit (tempProduct) ==>Slice Edit
    //2- action Detect Success Or Fail (Toast)
    //3- reset temp Product 
  }
  useEffect(() => {
    if (isSuccess) {
      setTempDocumentId("");
      onClose();
    }
  }, [isSuccess]);
  //3- Render
  const RenderDataEditModel = ModalInputData.map((input, i) => (
    <div key={i} className="my-3">
      <Input
        name={input.name}
        type={input.type}
        placeholder={input.name}
        onChange={onChange_Handle_EditModal}
        value={
          input.name === "categories"
            ? tempProduct.categories?.[0]?.title || ""
            : input.name === "thumbnail"
            ? tempProduct.thumbnail?.url || ""
            : (tempProduct[input.name as keyof IProduct] as string | number)
        }
      />
    </div>
  ));
  return (
    <>
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign={"center"}>Name</Th>
            <Th textAlign={"center"}>Category</Th>
            <Th textAlign={"center"}>Image</Th>
            <Th textAlign={"center"}>Price</Th>
            <Th textAlign={"center"}>Stock</Th>
            <Th textAlign={"center"}>Edit</Th>
            <Th textAlign={"center"}>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr
              fontSize={""}
              key={product.id}
              _hover={{ bg: "green.200", cursor: "pointer" }}
            >
              <Td textAlign={"center"}>{product.title}</Td>
              <Td textAlign={"center"}>
                {product.categories?.[0]?.title || "No Category"}
              </Td>
              <Td textAlign={"center"}>
                
                <Img  mx={'auto'} h={10} w={10}  borderRadius={'50%'} src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}` }  alt ="No Image" />  
              </Td>
              <Td textAlign={"center"}>{product.price}</Td>
              <Td textAlign={"center"}>{product.stock}</Td>
              <Td
                textAlign={"center"}
                color={"green.400"}
                onClick={() => {
                  setTempProduct(product);
                  onOpenModal();
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="green.400"
                  fontSize="2xl"
                >
                  <AiOutlineEdit />
                </Box>
              </Td>
              <Td
                color={"red.400"}
                onClick={() => {
                  setTempDocumentId(product.documentId);
                  onOpen();
                }}
              >
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontSize="2xl"
                >
                  <AiOutlineDelete />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AlertDialogComponent
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        onClick={HandleDeleteProduct}
        isLoading={isLoading}
      />

      {/* //Modal Update */}

      <ModalCustom
        isOpen={isOpenModal}
        onClose={onCloseModal}
        title="Edit Modal"
        finalRef={finalRefEdit}
        initialRef={initialRefEdit}
        okFunction={onSubmit_Handle_Edit}
      >
        <form>{RenderDataEditModel}</form>
      </ModalCustom>
    </>
  );
};

export default TableProduct;
