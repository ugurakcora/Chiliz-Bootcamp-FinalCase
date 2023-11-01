import { useAppContext } from "@/contexts/AppContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useAuth() {
    const { address, isConnected } = useAccount();
    const { setAddress, setIsConnected } = useAppContext();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { disconnect } = useDisconnect();

    const handleConnect = async () => {
        try {
            if (isConnected) {
                await handleDisconnectAndReset();
            }

            await connect();
            setAddress(address ?? "");
            setIsConnected(true);
        } catch (error) {
            console.error("Error connecting:", error);
        }
    };

    const handleDisconnectAndReset = async () => {
        try {
            await disconnect();
            setAddress(address ?? "");
            setIsConnected(false);
        } catch (error) {
            console.error("Error disconnecting:", error);
        }
    };

    return {
        address,
        isConnected,
        handleConnect,
        handleDisconnectAndReset,
    };
}
