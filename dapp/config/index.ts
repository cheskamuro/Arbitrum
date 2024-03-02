import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x920aFd40C13b47720F6dDf8a508Ed86133190981",
        abi as any,
        signer
    );
}