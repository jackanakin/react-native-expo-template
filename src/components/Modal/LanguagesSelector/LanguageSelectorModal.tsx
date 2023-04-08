import React from "react";
import { TouchableOpacity } from "react-native";
import { Dialog, Portal, List } from "react-native-paper";

import ModalProps from "../ModalProps";
import LanguageManager from "../../../i18n/language-manager";
import { Language } from "../../../i18n/languages";
import { usePreferences } from "../../../providers/Preferences/Preferences";

export const LanguageSelectorModal = ({ visible, setVisible }: ModalProps) => {
  const { setNewLanguage } = usePreferences();

  function triggerModal() {
    setVisible(!visible);
  }

  function handleSelect(value: Language) {
    setNewLanguage(value);
    triggerModal();
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={triggerModal}>
        <Dialog.Content>
          <List.Section>
            {Array.from(
              LanguageManager.getInstance().getAvailableLanguages().entries()
            ).map((entry) => {
              const [key, value] = entry;
              return (
                <TouchableOpacity
                  key={value.getNamespace()}
                  onPress={() => handleSelect(value)}
                >
                  <List.Item
                    title={value.getName()}
                    left={() => <List.Icon icon="folder" />}
                  />
                </TouchableOpacity>
              );
            })}
          </List.Section>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
