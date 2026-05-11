
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";


type FilterItem = {
  id: string;
  label: string;
};

type Props = {
  styles: any;
  colors: any;
  search: string;
  selectedTypeId: string | null;
  selectedCategorieId: string | null;
  selectedTagIds: string[];
  types: FilterItem[];
  categories: FilterItem[];
  tags: FilterItem[];


  onSearchChange: (value: string) => void;
  onTypeChange: (id: string | null) => void;
  onCategorieChange: (id: string | null) => void;
  onToggleTag: (id: string) => void;

  onReset: () => void;
};

export default function RessourcesFilters({
  styles,
  colors,
  search,
  selectedTypeId,
  selectedCategorieId,
  selectedTagIds,
  types,
  categories,
  tags,
  onSearchChange,
  onTypeChange,
  onCategorieChange,
  onToggleTag,
  onReset,
}: Readonly<Props>) {
  return (
    <View style={styles.filtersContainer}>
   
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une ressource..."
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={onSearchChange}
      />

      <Text style={styles.filterTitle}>Types</Text>

      <View style={styles.filtersRow}>
        {types.map((type) => {
          const isActive = selectedTypeId === type.id;

          return (
            <Pressable
              key={type.id}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => onTypeChange(isActive ? null : type.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.filterButtonTextActive,
                ]}
              >
                {type.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.filterTitle}>Catégories</Text>

      <View style={styles.filtersRow}>
        {categories.map((categorie) => {
          const isActive = selectedCategorieId === categorie.id;

          return (
            <Pressable
              key={categorie.id}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => onCategorieChange(isActive ? null : categorie.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.filterButtonTextActive,
                ]}
              >
                {categorie.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.filterTitle}>Tags</Text>

      <View style={styles.filtersRow}>
        {tags.map((tag) => {
          const isActive = selectedTagIds.includes(tag.id);

          return (
            <Pressable
              key={tag.id}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => onToggleTag(tag.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.filterButtonTextActive,
                ]}
              >
                #{tag.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
      </Pressable>
    </View>
  );
}