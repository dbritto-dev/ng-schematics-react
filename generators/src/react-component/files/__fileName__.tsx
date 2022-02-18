import type { <%= className %>Props } from './<%= fileName %>.types'

export const <%= className %> = ({ name = '<%= name %>' }: <%= className %>Props) => {
  return (
    <div>
      <h1>Welcome to {name}!</h1>
    </div>
  );
};
