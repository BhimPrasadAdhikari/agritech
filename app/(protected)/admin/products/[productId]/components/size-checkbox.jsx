
import { Controller} from 'react-hook-form';
const SizeCheckboxes = ({ control, sizes }) => {
    return (
      <Controller
        name="sizes"
        control={control}
        render={({ field }) => (
          <div>
            {sizes.map((size) => (
              <label key={size.id}>
                <input
                  type="checkbox"
                  value={size.value} // This remains as size.value
                  checked={field.value.some(selectedSize => selectedSize.value === size.value)}
                  onChange={() => {
                    const newSizes = field.value.some(selectedSize => selectedSize.value === size.value)
                      ? field.value.filter(selectedSize => selectedSize.value !== size.value) // Remove if already selected
                      : [...field.value, { name: size.name, value: size.value }]; // Add new size
                      console.log(newSizes)
                    field.onChange(newSizes); // Update form state
                  }}
                />
                {size.name} {/* Adjust as necessary to display the size name */}
              </label>
            ))}
          </div>
        )}
      />
    );
  };
  
  

export default SizeCheckboxes;
