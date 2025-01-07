export const PreferenceSerializer = (category: any) : any=> {
    const subCategories = category.subGeneres.map((subCategory:any) => subCategory.name)
    return {
        id: category.id,
        category_name: category.name,
        sub_categories: subCategories
    }
}

export const CategorySerializer = (category:any) => {
    return {
        id: category.id,
        name: category.name,
        short_description: category.shortDescription,
        subcategories: category.subGeneres.map((subCategory:any) => CategorySerializer(subCategory))
    }
}

export const CategoryListSerializer = (categories: any[]) : any => {
    return categories.map(category => CategorySerializer(category))
}

export const PreferenceListSerializer = (categories: any[]) : any => {
    return categories.map(category => PreferenceSerializer(category))
}
