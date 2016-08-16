Rails.application.routes.draw do
  root to: 'home#index'

  get 'access', to: 'home#access'
  get 'users', to: 'users#index'
  put 'sign_in', to: 'users#sign_in'
  post 'sign_up', to: 'users#create'
  delete 'sign_out', to: 'users#destroy'
end
