import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x6A8c8EA1F7805A931841aF123Fd3f9295639e655",
        abi as any,
        signer
    );
}