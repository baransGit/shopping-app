import { useNavigation } from "../../../../shared/hooks/useNavigation";
import { useCategories } from "../../hooks/useCategories";
import { CategoryCard } from "../CategoryCard";
import { Category, CategoryGroupWithData } from "../../types/Category";
import styles from "./styles.module.css";

export const CategoryList = () => {
  const { goToCategoryProducts } = useNavigation();
  const { data, isLoading } = useCategories();

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <div className={styles.container}>
      {data?.categories?.map((group: CategoryGroupWithData) => (
        <div key={group.id} className={styles.groupSection}>
          <div className={styles.groupTitle}>
            <h2>{group.name}</h2>
          </div>
          <div className={styles.categoryGrid}>
            {group.categories.map((category: Category) => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                image={category.image}
                onClick={() => goToCategoryProducts(category.slug)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
