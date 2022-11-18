import { useCallback, useContext, useEffect } from "react";
import { Blocker, History } from "history";
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ExitDialog } from "./ExitDialog";
import { ChakraProvider } from "@chakra-ui/react";
import { appTheme } from "@/themes";

export const useBlocker = (blocker: Blocker, when = true) => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = (navigator as Navigator & Pick<History, "block">).block(
      (tx) => {
        const autoUnblockingTx = {
          ...tx,
          retry() {
            unblock();
            tx.retry();
          },
        };

        blocker(autoUnblockingTx);
      }
    );
    return unblock;
  }, [navigator, blocker, when]);
};

export type PromptsConfig = {
  header: string;
  message: string;
  when: boolean;
};
/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt({ header, message, when }: PromptsConfig) {
  const blocker = useCallback(
    (tx: any) => {
      const portal = document.getElementsByClassName("chakra-portal")[0];
      const root = ReactDOM.createRoot(portal!);

      const closePrompt = (state: boolean) => {
        if (portal) {
          root.unmount();
        }
        if (state) {
          tx.retry();
        } else {
          const portals: HTMLCollectionOf<Element> =
            document.getElementsByClassName("chakra-portal");

          if (portals.length > 1) {
            document.removeChild(portals[1]);
          }
        }
      };

      root.render(
        <ChakraProvider theme={appTheme}>
          <ExitDialog
            header={header}
            exitMessage={message}
            onProceed={() => closePrompt(true)}
            onCancel={() => closePrompt(false)}
          />
        </ChakraProvider>
      );
    },
    [message, header]
  );

  useBlocker(blocker, when);
}
