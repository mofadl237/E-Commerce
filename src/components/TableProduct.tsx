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
  Img,
} from "@chakra-ui/react";
import {
  initialProduct,
  type IProduct,
  type IProductUpdate,
} from "../interface";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AlertDialogComponent from "../shared/AlertDialog";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  useDeleteProductDashMutation,
  useUpdateProductDashMutation,
} from "../app/Services/GetProductDash";
import ModalCustom from "../shared/ModalCustom";
import FormToModal from "../shared/FormToModal";
interface IProps {
  products: IProduct[];
}
const TableProduct = ({ products }: IProps) => {
  //1- state
  const [tempDocumentID, setTempDocumentId] = useState("");
  const [tempProduct, setTempProduct] = useState<IProduct>(initialProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const [thumbnail, setThumbnail] = useState<File | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [deleteProduct, { isLoading, isSuccess }] =
    useDeleteProductDashMutation();
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductDashMutation();

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
  const onChange_Handle_EditModal = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    return setTempProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onChange_Handle_Thumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    //setThumbnail(file);

    setTempProduct((prev) => ({
      ...prev,
      thumbnail: {
        ...prev.thumbnail,
        url: file.name,
      },
    }));
  };

  const onChange_Handle_SelectModal = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTempProduct((prev) => ({
      ...prev,
      categories: [
        {
          ...prev.categories?.[0],
          title: value,
        },
      ],
    }));
  };
  const onSubmit_Handle_Edit = async () => {
    //     const formData = new FormData();
    // formData.append(
    //   "data",
    //   JSON.stringify({
    //     title: tempProduct.title,
    //     description: tempProduct.description,
    //     price: Number(tempProduct.price),
    //     stock: Number(tempProduct.stock),
    //   })
    // );

    // if (thumbnail) {
    //   formData.append("files.thumbnail", thumbnail);
    // }
    const formData: IProductUpdate = {
      title: tempProduct.title,
      description: tempProduct.description,
      price: Number(tempProduct.price),
      stock: Number(tempProduct.stock),
    };
    console.log("FormData being sent:", formData);

    const { error } = await updateProduct({
      documentId: tempProduct.documentId,
      formData,
    });
    if (error) console.log(error);
    //1- push New Edit (tempProduct) ==>Slice Edit

    //2- action Detect Success Or Fail (Toast)

    //3- reset temp Product
    setTempProduct(initialProduct);
    //setThumbnail(null);
    onCloseModal();
  };
  useEffect(() => {
    if (isSuccess) {
      setTempDocumentId("");
      onClose();
    }
  }, [isSuccess]);
  //3- Render
  // const RenderDataEditModel = ModalInputData.map((input, i) => (
  //   <div key={i} className="my-3">
  //     <Input
  //       name={input.name}
  //       type={input.type}
  //       placeholder={input.name}
  //       onChange={onChange_Handle_EditModal}
  //       value={
  //         input.name === "categories"
  //           ? tempProduct.categories?.[0]?.title
  //           : input.name === "thumbnail"
  //           ? tempProduct.thumbnail?.url || ""
  //           : (tempProduct[input.name as keyof IProduct] as string | number)
  //       }
  //     />
  //   </div>
  // ));
  //Replace To Component Form Using Update && Add
  return (
    <Box w="full" overflowX="auto">
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
                <Img
                  mx={"auto"}
                  h={10}
                  w={10}
                  borderRadius={"50%"}
                  src={
                    product.thumbnail?.url ? `${product.thumbnail?.url}`:`/img/my-1.jpg`
                  }
                  alt="No Image"
                />
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
        isLoading={isLoadingUpdate}
        title="Edit Modal"
        finalRef={finalRefEdit}
        initialRef={initialRefEdit}
        okFunction={onSubmit_Handle_Edit}
      >
        {/* <form>
          {RenderDataEditModel}
          <SelectCategory
            onChange={onChange_Handle_SelectModal}
            categories={SelectCategoryData}
            value={tempProduct.categories?.[0].title ?? " "}
          />
        </form> */}
        <FormToModal
          product={tempProduct}
          onChange={onChange_Handle_EditModal}
          onSelect={onChange_Handle_SelectModal}
          onChangeThumbnail={onChange_Handle_Thumbnail}
        />
      </ModalCustom>
    </Box>
  );
};

export default TableProduct;
