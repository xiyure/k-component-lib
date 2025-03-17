import { Accessor, ComponentProps, Component } from 'solid-js';
import { SearchParams } from 'meilisearch';

type DocSearchHotKeys = string[] | false;
declare function useDocSearchHotKeys({ isOpen, onOpen, onClose, onInput, hotKeys, }: {
    isOpen: Accessor<boolean>;
    onOpen: () => void;
    onClose: () => void;
    onInput: (query: string) => void;
    hotKeys: DocSearchHotKeys;
}): void;

type ButtonTranslations = Partial<{
    buttonText: string;
    buttonAriaLabel: string;
}>;
type DocSearchButtonProps = ComponentProps<"button"> & {
    hotKeys: DocSearchHotKeys;
    translations?: ButtonTranslations;
};
declare const DocSearchButton: Component<DocSearchButtonProps>;

type FooterTranslations = Partial<{
    selectText: string;
    selectKeyAriaLabel: string;
    navigateText: string;
    navigateUpKeyAriaLabel: string;
    navigateDownKeyAriaLabel: string;
    closeText: string;
    closeKeyAriaLabel: string;
    poweredByText: string;
}>;

type SearchBoxTranslations = Partial<{
    searchDocsPlaceHolder: string;
    resetButtonTitle: string;
    resetButtonAriaLabel: string;
    cancelButtonText: string;
    cancelButtonAriaLabel: string;
}>;

type ModalTranslations = Partial<{
    linkToTheResultAriaLabel: string;
}> & FooterTranslations & SearchBoxTranslations;
type DocSearchModalProps = DocSearchProps & {
    translations?: ModalTranslations;
    onClose?: () => void;
    initialQuery?: string;
};
declare const DocSearchModal: Component<DocSearchModalProps>;

interface DocSearchProps {
    host: string;
    apiKey: string;
    indexUid: string;
    clientAgents?: string[];
    /**
     * An array of hotkeys to trigger the search modal.
     * Can be either a single character, for example `s` or `/`,
     * or a combination of modifiers and key, for example `ctrl+k`.
     *
     * Default keys are `['ctrl+k', 's', '/']`
     *
     * Set to `false` to disable default keys.
     */
    hotKeys?: DocSearchHotKeys;
    translations?: DocSearchTranslations;
    searchParams?: SearchParams;
    environment?: typeof window;
    /**
     * Duration to wait between keystores to determine whether a search should happen or not.
     * Defaults to `200`.
     *
     * Set to `false` to disable debouncing.
     *
     * This is an optimization that discards unnecessary search operations, for example,
     * if a user is typing `hello`, we skip search operations for `h`, `he`, `hel` and `hell`
     * as this usually not what the user wants to search for, and instead wait a few milliseconds until
     * the user stops typing for a brief moment, and then we do the search operation.
     * In the previous example, that would be `hello`.
     */
    debounceDuration?: number | false;
}
type DocSearchTranslations = Partial<{
    button: ButtonTranslations;
    modal: ModalTranslations;
}>;
declare const DocSearch: Component<DocSearchProps>;

export { type ButtonTranslations, DocSearch, DocSearchButton, type DocSearchButtonProps, type DocSearchHotKeys, DocSearchModal, type DocSearchModalProps, type DocSearchProps, type DocSearchTranslations, type ModalTranslations, useDocSearchHotKeys };
